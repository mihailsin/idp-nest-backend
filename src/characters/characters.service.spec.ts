import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { PrismaService } from '../prisma.service';

describe('CharactersService', () => {
    let service: CharactersService;
    let repository: PrismaService;

    const repositoryMock = {
        character: {
            findMany: jest.fn(x => x),
            findUniqueOrThrow: jest.fn(x => x),
            create: jest.fn(x => x),
            update: jest.fn(x => x),
            delete: jest.fn(x => x),
        },
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
            providers: [
                CharactersService,
                { provide: PrismaService, useValue: repositoryMock },
            ],
        }).compile();

        service = module.get<CharactersService>(CharactersService);
        repository = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe('getAll', () => {
        it('should return all characters', async () => {
            jest.spyOn(
                repositoryMock.character,
                'findMany'
            ).mockReturnValueOnce(charactersMock);
            const result = await service.getAll();

            expect(repository.character.findMany).toHaveBeenCalledTimes(1);
            expect(result).toBeDefined();
            expect(result).toHaveLength(3);
            expect(result).toEqual(charactersMock);
        });
    });

    describe('getOne', () => {
        it('should get object by id', async () => {
            jest.spyOn(
                repositoryMock.character,
                'findUniqueOrThrow'
            ).mockReturnValueOnce(charactersMock[0]);
            const result = await service.getOne(charactersMock[0].carachter_id);

            expect(
                repository.character.findUniqueOrThrow
            ).toHaveBeenCalledTimes(1);
            expect(repository.character.findUniqueOrThrow).toHaveBeenCalledWith(
                {
                    where: { character_id: charactersMock[0].carachter_id },
                }
            );
            expect(result).toMatchObject(charactersMock[0]);
        });

        it('should throw exception; object not found', async () => {
            jest.spyOn(
                repositoryMock.character,
                'findUniqueOrThrow'
            ).mockImplementationOnce(() => {
                throw new Error();
            });
            let error: Error;
            try {
                await service.getOne('nonExistentId');
            } catch (e) {
                error = e;
            }

            expect(repository.character.findUniqueOrThrow).toHaveBeenCalledWith(
                { where: { character_id: 'nonExistentId' } }
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message');
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
            jest.spyOn(repositoryMock.character, 'create').mockReturnValueOnce(
                charactersMock[0]
            );
            const result = await service.create(character);

            expect(repository.character.create).toHaveBeenCalledTimes(1);
            expect(repository.character.create).toHaveBeenCalledWith({
                data: character,
            });
            expect(result).toMatchObject(charactersMock[0]);
        });
    });

    describe('update', () => {
        it('should update object', async () => {
            const character = charactersMock[0];
            character.firstName = 'Changed';
            jest.spyOn(repositoryMock.character, 'update').mockReturnValueOnce(
                character
            );
            const result = await service.update(
                charactersMock[0].carachter_id,
                { firstName: 'Changed' }
            );

            expect(repository.character.update).toHaveBeenCalledTimes(1);
            expect(repository.character.update).toHaveBeenCalledWith({
                data: { firstName: 'Changed' },
                where: { character_id: charactersMock[0].carachter_id },
            });
            expect(result).toMatchObject(character);
        });
        it('should throw exception; object not found', async () => {
            jest.spyOn(repository.character, 'update').mockImplementationOnce(
                () => {
                    throw new Error();
                }
            );
            let error: Error;
            try {
                await service.update('nonExistentId', {
                    firstName: 'Changed',
                });
            } catch (e) {
                error = e;
            }

            expect(repository.character.update).toHaveBeenCalledWith({
                data: { firstName: 'Changed' },
                where: { character_id: 'nonExistentId' },
            });
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message');
        });
    });

    describe('delete', () => {
        it('should delete object', async () => {
            jest.spyOn(repositoryMock.character, 'delete').mockReturnValueOnce(
                charactersMock[0]
            );
            const result = await service.delete(charactersMock[0].carachter_id);

            expect(repository.character.delete).toHaveBeenCalledTimes(1);
            expect(repository.character.delete).toHaveBeenCalledWith({
                where: { character_id: charactersMock[0].carachter_id },
            });
            expect(result).toMatchObject(charactersMock[0]);
        });

        it('should throw exception; object not found', async () => {
            jest.spyOn(
                repositoryMock.character,
                'delete'
            ).mockImplementationOnce(() => {
                throw new Error();
            });
            let error: Error;
            try {
                await service.delete('nonExistentId');
            } catch (e) {
                error = e;
            }

            expect(repository.character.delete).toHaveBeenCalledWith({
                where: { character_id: 'nonExistentId' },
            });
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message');
        });
    });
});
