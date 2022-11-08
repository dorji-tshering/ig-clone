import Post from './Post';

const posts = [
    {
        id: '123',
        username: 'dorjidev',
        avatar: '/images/dorji.jpg',
        img: '/images/dorji.jpg',
        caption: 'This is truly awesome and DOPE!',
    },
    {
        id: '125',
        username: 'dolkar',
        avatar: '/images/dorji.jpg',
        img: '/images/dorji.jpg',
        caption: 'Enjoying the life as it goes!',
    }, 
    {
        id: '127',
        username: 'bumie',
        avatar: '/images/dorji.jpg',
        img: '/images/dorji.jpg',
        caption: 'This is the best coding platform!',
    },
];

const Posts = () => {

    return (
        <div>
            {
                posts.map((post) => (
                    <Post 
                        key={post.id} 
                        id={post.id} 
                        username={post.username} 
                        avatar={post.avatar}
                        image={post.img}
                        caption={post.caption} />
                ))
            }
        </div>
    )
}

export default Posts;