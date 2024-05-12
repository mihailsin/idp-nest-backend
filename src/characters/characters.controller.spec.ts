import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { PrismaService } from '../prisma.service';
import { CharactersService } from './characters.service';
// import { Character } from './characters.interface';

describe('CharactersController', () => {
    let controller: CharactersController;
    let service: CharactersService;
    // let repository: PrismaService;

    const serviceMock = {
        getAll: jest.fn(x => x),
    };

    const repositoryMock = {
        characters: {
            findMany: jest.fn(x => x),
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
            controllers: [CharactersController],
            providers: [
                {
                    provide: CharactersService,
                    useValue: serviceMock,
                },
                {
                    provide: PrismaService,
                    useValue: repositoryMock,
                },
            ],
        }).compile();

        controller = module.get<CharactersController>(CharactersController);
        service = module.get<CharactersService>(CharactersService);
        repository = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
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
});
