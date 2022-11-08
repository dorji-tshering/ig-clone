import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Story from './Story';

interface User {
    userId: string,
    username: string,
    email: string,
    avatar: string,
    password: string,
    birthdate: Date,
    registeredAt: Date,
}

const Stories = () => {
    const [users, setUsers] = useState<User[]>([]);

    
    useEffect(() => {
        const USERS: User[] = [];

        function createRandomUser(): User {
            return {
              userId: faker.datatype.uuid(),
              username: faker.internet.userName(),
              email: faker.internet.email(),
              avatar: faker.image.avatar(),
              password: faker.internet.password(),
              birthdate: faker.date.birthdate(),
              registeredAt: faker.date.past(),
            };
          }
          
          Array.from({ length: 20 }).forEach(() => {
            USERS.push(createRandomUser());
          });
          setUsers(USERS);

    }, []);
    
    return (
        <div className="flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm
            overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
            {users.map((profile) => {
                return (
                    <Story 
                        key={profile.userId} 
                        avatar={profile.avatar} 
                        username={profile.username}
                    />
                );
            })}
        </div>
    )
}

export default Stories;