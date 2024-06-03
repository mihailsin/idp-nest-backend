import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const serviceMock = {
        signUp: jest.fn(x => x),
        login: jest.fn(x => x),
    };

    const userDtoMock = {
        email: 'superuser@test.com',
        firstName: 'super',
        middleName: 'midName',
        lastName: 'user',
        dateOfBirth: '1988-01-20T00:00:00.000Z',
        password: 'testpassword',
    };

    const resultMock = {
        access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWQxZjllMS0xYzMyLTQzN2EtODVkOS1lZWUwMjFhNDRkNWUiLCJpYXQiOjE3MTczMzMxOTMsImV4cCI6MTcxNzM3NjM5M30.O4AGoVAP5MiIke9pEGcT3-AtElAQjXQp2lQTQZik0Hc',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: serviceMock }],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('signUp', () => {
        it('should create user', async () => {
            jest.spyOn(serviceMock, 'signUp').mockReturnValueOnce(resultMock);
            const result = await controller.signUp(userDtoMock);

            expect(service.signUp).toHaveBeenCalledTimes(1);
            expect(result).toBeDefined();
            expect(result).toEqual(resultMock);
        });

        it('should throw error; email taken', async () => {
            jest.spyOn(serviceMock, 'signUp').mockImplementationOnce(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                userDtoMock => {
                    throw new HttpException(
                        'Email already taken',
                        HttpStatus.BAD_REQUEST
                    );
                }
            );

            let error: Error;
            try {
                await controller.signUp(userDtoMock);
            } catch (e) {
                error = e;
            }

            expect(service.signUp).toHaveBeenCalledWith(userDtoMock);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual('Email already taken');
        });
    });

    describe('login', () => {
        it('should login user', async () => {
            jest.spyOn(serviceMock, 'login').mockReturnValueOnce(resultMock);
            const result = await controller.login(userDtoMock);

            expect(result).toBeDefined();
            expect(result).toEqual(resultMock);
        });

        it('should throw error; user not found', async () => {
            jest.spyOn(serviceMock, 'login').mockImplementationOnce(
                userDtoMock => {
                    throw new HttpException(
                        `User with email ${userDtoMock.email} does not exists`,
                        400
                    );
                }
            );

            let error: Error;
            try {
                await controller.login(userDtoMock);
            } catch (e) {
                error = e;
            }

            expect(service.login).toHaveBeenCalledTimes(2);
            expect(service.login).toHaveBeenCalledWith(userDtoMock);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(
                `User with email ${userDtoMock.email} does not exists`
            );
        });
    });
});
