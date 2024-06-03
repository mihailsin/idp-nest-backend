/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../lib';

describe('AuthService', () => {
    let service: AuthService;
    let jwtService: JwtService;
    let repository: PrismaService;
    let bcryptService: BcryptService;

    const repositoryMock = {
        user: {
            findUnique: jest.fn(x => x),
            create: jest.fn(x => x),
        },
    };

    const userMock = {
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
            providers: [
                AuthService,
                { provide: PrismaService, useValue: repositoryMock },
                { provide: JwtService, useValue: {} },
                { provide: BcryptService, useValue: {} },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        repository = module.get<PrismaService>(PrismaService);
        jwtService = module.get<JwtService>(JwtService);
        bcryptService = module.get<BcryptService>(BcryptService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe('signUp', () => {
        it('should return token', async () => {
            jest.spyOn(repositoryMock.user, 'create').mockReturnValueOnce(
                userMock
            );
            jest.spyOn(service, 'signUp').mockImplementationOnce(
                async userMock => resultMock
            );
            const { email } = userMock;
            jest.spyOn(service, 'getUser').mockImplementationOnce(
                async email => null
            );
            const result = await service.signUp(userMock);

            expect(service.signUp).toHaveBeenCalledWith(userMock);
            // expect(service.getUser).toHaveBeenCalledWith(email);
            // expect(repository.user.create).toHaveBeenCalledTimes(1);
            expect(result).toBeDefined();
            expect(result).toEqual(resultMock);
        });
    });
});
