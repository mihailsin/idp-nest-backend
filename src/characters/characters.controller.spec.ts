import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CharactersController', () => {
    let controller: CharactersController;
    let service: CharactersService;

    const serviceMock = {
        getAll: jest.fn(x => x),
        getOne: jest.fn(x => x),
        create: jest.fn(x => x),
        update: jest.fn(x => x),
        delete: jest.fn(x => x),
    };

    const charactersMock = [
        {
            carachter_id: '5b4cfd08-479d-429a-8593-207fd9d827c3',
            dateOfBirth: '2004-03-03',
            firstName: 'Name',
            lastName: 'Surname',
            image: `https:/someImage.path.com`,
        },
        {
            carachter_id: '5b4cfd08-479d-429a-8593-207fd9d827f8',
            dateOfBirth: '2004-02-03',
            firstName: 'Name',
            lastName: 'Surname',
            image: `https:/someImage.path.com`,
        },
        {
            carachter_id: '5b4cfd08-479d-429a-8593-207fd9d563v2',
            dateOfBirth: '2004-06-27',
            firstName: 'Name',
            lastName: 'Surname',
            image: `https:/someImage.path.com`,
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CharactersController],
            providers: [
                {
                    provide: CharactersService,
                    useValue: serviceMock,
                },
            ],
        }).compile();

        controller = module.get<CharactersController>(CharactersController);
        service = module.get<CharactersService>(CharactersService);
        // repository = module.get<PrismaService>(PrismaService);
    });

    class ExpectedNotFoundError extends Error {
        constructor() {
            super();
        }
        code = 'P2025';
    }

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should return all characters', async () => {
            jest.spyOn(serviceMock, 'getAll').mockReturnValueOnce(
                charactersMock
            );
            const result = await controller.getAll();

            expect(service.getAll).toHaveBeenCalledTimes(1);
            expect(result).toBeDefined();
            expect(result).toHaveLength(3);
            expect(result).toEqual(charactersMock);
        });
    });

    describe('getOne', () => {
        it('should get object by id', async () => {
            jest.spyOn(serviceMock, 'getOne').mockReturnValueOnce(
                charactersMock[0]
            );
            const result = await controller.getOne(
                charactersMock[0].carachter_id
            );

            expect(service.getOne).toHaveBeenCalledTimes(1);
            expect(service.getOne).toHaveBeenCalledWith(
                charactersMock[0].carachter_id
            );
            expect(result).toMatchObject(charactersMock[0]);
        });

        it('should throw exception; object not found', async () => {
            jest.spyOn(serviceMock, 'getOne').mockImplementationOnce(() => {
                throw new ExpectedNotFoundError();
            });
            let error: { message: any };
            try {
                await controller.getOne('nonExistentId');
            } catch (e) {
                error = e;
            }

            expect(service.getOne).toHaveBeenCalledWith('nonExistentId');
            expect(error).toBeInstanceOf(HttpException);
            expect(error).toHaveProperty('message');
            expect(error.message).toEqual('Character not found');
        });
    });

    describe('create', () => {
        it('should create object', async () => {
            const character = {
                dateOfBirth: '2004-03-03',
                firstName: 'Name',
                lastName: 'Surname',
                image: `https:/someImage.path.com`,
            };
            jest.spyOn(serviceMock, 'create').mockReturnValueOnce(
                charactersMock[0]
            );
            const result = await controller.create(character);

            expect(service.create).toHaveBeenCalledTimes(1);
            expect(service.create).toHaveBeenCalledWith(character);
            expect(result).toMatchObject(charactersMock[0]);
        });
    });

    describe('update', () => {
        it('should update object', async () => {
            const character = charactersMock[0];
            character.firstName = 'Changed';
            jest.spyOn(serviceMock, 'update').mockReturnValueOnce(character);
            const result = await controller.update(
                charactersMock[0].carachter_id,
                { firstName: 'Changed' }
            );

            expect(service.update).toHaveBeenCalledTimes(1);
            expect(service.update).toHaveBeenCalledWith(
                charactersMock[0].carachter_id,
                { firstName: 'Changed' }
            );
            expect(result).toMatchObject(character);
        });
        it('should throw exception; object not found', async () => {
            jest.spyOn(serviceMock, 'update').mockImplementationOnce(() => {
                throw new ExpectedNotFoundError();
            });
            let error: { message: any };
            try {
                await controller.update('nonExistentId', {
                    firstName: 'Changed',
                });
            } catch (e) {
                error = e;
            }

            expect(service.update).toHaveBeenCalledWith('nonExistentId', {
                firstName: 'Changed',
            });
            expect(error).toBeInstanceOf(HttpException);
            expect(error).toHaveProperty('message');
            expect(error.message).toEqual('Character not found');
        });
    });

    describe('delete', () => {
        it('should delete object', async () => {
            jest.spyOn(serviceMock, 'delete').mockReturnValueOnce(
                charactersMock[0]
            );
            const result = await controller.delete(
                charactersMock[0].carachter_id
            );

            expect(service.delete).toHaveBeenCalledTimes(1);
            expect(service.delete).toHaveBeenCalledWith(
                charactersMock[0].carachter_id
            );
            expect(result).toMatchObject(charactersMock[0]);
        });

        it('should throw exception; object not found', async () => {
            jest.spyOn(serviceMock, 'delete').mockImplementationOnce(() => {
                throw new ExpectedNotFoundError();
            });
            let error: { message: any };
            try {
                await controller.delete('nonExistentId');
            } catch (e) {
                error = e;
            }

            expect(service.delete).toHaveBeenCalledWith('nonExistentId');
            expect(error).toBeInstanceOf(HttpException);
            expect(error).toHaveProperty('message');
            expect(error.message).toEqual('Character not found');
        });
    });
});
