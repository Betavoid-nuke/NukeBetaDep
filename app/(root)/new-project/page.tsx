
import AccountProfile from '@/components/forms/AccountProfile';
import NewProject from '@/components/forms/NewProject';
import { fetchUser } from '@/lib/actions/user.action';
import React from 'react'
import { currentUser } from "@clerk/nextjs";

async function newproject() {

  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (

    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>

      <h1 className='head-text'>Create new Project</h1>

      <p className='mt-3 text-base-regular text-light-2'>
        Create a new project and get started!
      </p>

      <section className='mt-9 bg-dark-2 p-10' style={{borderRadius:20}}>
        <NewProject user={userData} btnTitle={'Continue'} isassemblychild={false} parentid={''} />
      </section>

    </main>

  );

}

export default newproject