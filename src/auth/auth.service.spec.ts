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

    const jwtServiceMock = {
        sign: jest.fn(x => x),
    };

    const bcryptServiceMock = {
        hashString: jest.fn(x => x),
        compare: jest.fn(x => x),
    };

    const repositoryMock = {
        user: {
            findUnique: jest.fn(x => x),
            create: jest.fn(x => x),
        },
    };

    const userMock = {
        id: '1234-4321',
        email: 'superuser@test.com',
        firstName: 'super',
        middleName: 'midName',
        lastName: 'user',
        dateOfBirth: new Date(),
        password: 'testpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
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
                { provide: JwtService, useValue: jwtServiceMock },
                { provide: BcryptService, useValue: bcryptServiceMock },
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
            const { email } = userMock;
            jest.spyOn(service, 'getUser').mockImplementationOnce(
                async email => null
            );
            jest.spyOn(bcryptService, 'hashString').mockReturnValueOnce(
                Promise.resolve('$SDe@!FXXC')
            );
            jest.spyOn(jwtService, 'sign').mockReturnValueOnce(
                resultMock.access_token
            );
            const result = await service.signUp({
                email: userMock.email,
                firstName: userMock.firstName,
                lastName: userMock.lastName,
                middleName: userMock.middleName,
                dateOfBirth: '1988',
                password: userMock.password,
            });

            expect(service.getUser).toHaveBeenCalledWith(email);
            expect(repository.user.create).toHaveBeenCalledTimes(1);
            expect(result).toBeDefined();
            expect(result).toEqual(resultMock);
        });
    });

    describe('login', () => {
        it('should return token', async () => {
            jest.spyOn(repositoryMock.user, 'findUnique').mockReturnValueOnce(
                userMock
            );
            const { email } = userMock;
            jest.spyOn(service, 'getUser').mockImplementationOnce(async email =>
                Promise.resolve(userMock)
            );
            jest.spyOn(bcryptService, 'compare').mockReturnValueOnce(
                Promise.resolve(true)
            );
            jest.spyOn(jwtService, 'sign').mockReturnValueOnce(
                resultMock.access_token
            );
            const result = await service.login({
                email: userMock.email,
                password: userMock.password,
            });

            expect(service.getUser).toHaveBeenCalledWith(email);
            expect(repository.user.create).toHaveBeenCalledTimes(1);
            expect(result).toBeDefined();
            expect(result).toEqual(resultMock);
        });
    });
});
