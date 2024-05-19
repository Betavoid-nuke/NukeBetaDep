import { SignIn } from "@clerk/nextjs";
// import { SignIn } from "../../../../public/assets/projectPoster2.jpg";

export default function Page() {
    // background: `url('../../../../public/assets/projectPoster2.jpg') center/cover no-repeat`
    return (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}} className="gradient-background">
            <div style={{fontSize:'32px', marginBottom:'20px', color:'white', fontWeight:'bold'}}>B E T A V O I D</div>
            <SignIn />
        </div>
    );
}