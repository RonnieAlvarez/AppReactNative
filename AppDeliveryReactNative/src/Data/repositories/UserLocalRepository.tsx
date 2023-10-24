import { User } from '../../Domain/entities/User';
import { UserLocalRepository } from '../../Domain/repositories/UserLocalRepotory';
import { LocalStorage } from '../sources/Local/LocalStorage';

export class UserLocalRepositoryImpl implements UserLocalRepository {
	async save(user: User): Promise<void> {
		const { save } = LocalStorage();
		await save('user', JSON.stringify(user));
	}

	async getUser(): Promise<User> {
		const { getItem } = LocalStorage();
		const data = await getItem('user');
		const user: User = JSON.parse(data as any);
		return user;
	}
}
