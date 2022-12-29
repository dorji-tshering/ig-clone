import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getProviders, LiteralUnion, signIn as SignIntoProvider} from "next-auth/react"
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import { ImTwitter } from 'react-icons/im'
import { useSetRecoilState } from "recoil"
import { noticeState } from '../../atoms/noticeAtom'
import { VscLinkExternal } from 'react-icons/vsc'
import { useSession } from "next-auth/react"
import { useEffect } from "react"

// possible signin errors
const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same provider you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
      "Sign in failed. Check if the details you provided are correct.",
    default: "Unable to sign in.",
};

function SignIn({ providers }: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>) {
    const router = useRouter()
    const error = router.query.error as keyof typeof errors
    const setNotice = useSetRecoilState(noticeState)
    const {status} = useSession()

    useEffect(() => {
        if(error) {
            setNotice({
                show: true,
                message: errors[error] ?? errors['default']
            })
        }
        // hide initial loader if the sign in page is refreshed
        const loader = document.getElementById('initial-loader')
        if(loader) loader.style.display = 'none' 
    }, [error])

    if(status === 'authenticated') {
        router.push('/')
        return
    }

    if(status === 'loading') return <></>

    return (
        <>
            <div className="flex justify-center items-center flex-col h-full overflow-y-auto 
                px-5 text-center py-10">
                <div className="bg-white rounded-lg shadow-mainShadow px-5 py-8 sm:p-14">
                    <img className='w-40 mx-auto' src="/images/instagram-logo.png" alt="Instagram logo" />
                    <p className="text-sm text-gray-500 mt-3">
                        This is not a <span className='text-black font-[500]'>REAL</span> app, it is built for educational purposes only
                    </p>
                    <h2 className="text-sm mt-5 font-bold text-gray-400">SIGN IN</h2>
                    <div className="mt-4 border rounded-lg px-5 py-5 w-full sm:max-w-[400px] sm:mx-auto">
                        {Object.values(providers).map((provider) => (
                            <div key={provider.name} className='first:mb-4'>
                                <button className='py-3 border rounded-lg font-[500] w-full flex items-center justify-center
                                    text-gray-700 hover:border-gray-400 transition-all duration-500' 
                                    onClick={() => 
                                        SignIntoProvider(provider.id, {callbackUrl: "/"})
                                    }>
                                    Sign in with {provider.id === 'twitter' ? 'Twitter' : provider.name}
                                    { provider.id === 'twitter' && <span className='ml-3 text-[#1D9BEE]'><ImTwitter size={20}/></span> }
                                    { provider.id === 'google' && <span className='ml-3'><FcGoogle size={20}/></span> }
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <a 
                            href="https://github.com/dorji-tshering/ig-clone" target="_blank" 
                            className="text-gray-600 w-fit mx-auto flex items-center justify-center hover:text-instaBlue hover:underline">
                            Github<VscLinkExternal className="inline ml-2 text-gray-400" strokeWidth={.8} size={12}/>
                        </a>
                    </div>
                </div>
                <p className="mt-10 text-gray-400">By <a className="text-gray-700 underline" href="https://dorji-dev.vercel.app" target="_blank">Dorji Tshering</a></p>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    }
}

export default SignIn