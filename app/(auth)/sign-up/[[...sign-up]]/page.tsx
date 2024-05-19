import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}} className="gradient-background">
            <div style={{fontSize:'32px', marginBottom:'20px', color:'white', fontWeight:'bold'}}>B E T A V O I D</div>
            <SignUp />
        </div>
    );
}