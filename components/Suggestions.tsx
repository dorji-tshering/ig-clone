import { useEffect, useState } from "react"
import { faker } from '@faker-js/faker';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface User {
    userId: string,
    username: string,
    email: string,
    avatar: string,
    password: string,
    birthdate: Date,
    registeredAt: Date,
}

function Suggestions() {
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
          
          Array.from({ length: 7 }).forEach(() => {
            USERS.push(createRandomUser());
          });
          setUsers(USERS);

    }, []);

    // useEffect(()=>{
    //     getDocs(collection(db,'users')).then((doc)=>{
    //         setSuggestions(doc.docs.map((doc) => ({...doc.data()})))
    //     })
    // },[])

    return (
        <div className='mt-4 ml-10'>
            <div className="flex justify-between text-sm mb-5">
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>
            {
                users.map(profile=>(
                    <div key={profile.userId} className="flex items-center justify-between mt-3">
                        <img className='w-10 h-10 rounded-full border p-[2px]' src={profile.avatar} alt="" />
                        <div className="flex-1 ml-4">
                            <h2 className='font-semibold text-sm'>{profile.username}</h2>
                        </div>
                        <button className='text-instaBlue text-sm  font-bold'>Follow</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Suggestions