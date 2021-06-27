import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting'
import { SettingsRepository } from '../repositories/SettingsRepository'

interface ISettingsCreate {
    chat: boolean;
    username: string
}

class SettingsService{

    private settingRepository: Repository<Setting>

    constructor() {
        this.settingRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username } : ISettingsCreate) {

        const userAlreayExists = await this.settingRepository.findOne({
            username
        });

        if(userAlreayExists) {
            throw new Error("User already exists!")
        }

        const settings = this.settingRepository.create({
            chat,
            username
        })

        await this.settingRepository.save(settings);

        return settings
    }

    async findByUsername(username: string) {
        const settings = await this.settingRepository.findOne({
            username
        })
        
        return settings;
    }

}

export { SettingsService }