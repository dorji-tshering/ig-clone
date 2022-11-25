import { getProviders, signIn as SignIntoProvider} from "next-auth/react"
import Header from "../../components/Header";

function SignIn({ providers }: any) {

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-32 px-14 text-center ">
                <img className='w-80' src="/images/instagram-logo.png" alt="Instagram logo" />
                <p className="font-xs italic">
                    This is not a REAL app, it is built for educational purposes only
                </p>
                <div className="mt-40">
                    {Object.values(providers).map((provider: any) => (
                        <div key={provider.name}>
                        <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => SignIntoProvider(provider.id, {callbackUrl: "/"})}>
                            Sign in with {provider.name}
                        </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();
console.log(providers);
    return {
        props: {
            providers,
        },
    }
}

export default SignIn