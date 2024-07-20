import Link from "next/link";
import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  userid:string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  userid
}: Props) {

  return (

    <div className="profileHeader">
      <div className="transbox">

        <div className="flex w-full flex-col justify-start">

          <div className="flex items-center justify-between">

            <div className="flex mt-3 items-center gap-3">
              <div className="relative h-20 w-20 object-cover">
                <Image
                  src={imgUrl}
                  alt="logo"
                  fill
                  className="rounded-full object-cover shadow-2xl"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-left text-heading3-bold text-light-1">
                  {name}
                </h2>
                <p className="text-base-medium text-gray-1">@{username}</p>
              </div>
            </div>

            {accountId === authUserId && type !== "Community" && (
              <Link href={`/profileedit/${userid}`}>
                <div className="flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2">
                  <Image
                    src="/assets/edit.svg"
                    alt="logout"
                    width={16}
                    height={16}
                  />

                  <p className="text-light-2 max-sm:hidden">Edit</p>
                </div>
              </Link>
            )}
          </div>

          <p className="mt-8 mb-3 max-w-lg text-base-regular text-light-2">{bio}</p>

        </div>

      </div>
    </div>

  );

}

export default ProfileHeader;
