import { useCallback, useState } from "react";

import { useRouter } from "next/router";
import { RiSearchLine } from "react-icons/ri";

import Avatar from "@/components/Avatar";
import { IUser } from "@/types/user.type";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";
import { set } from "date-fns";

const Searchbar = () => {
  const [searchUsers, setSearchUsers] = useState<IUser[]>([]);

  const router = useRouter();
  const { data: allUsers = [] } = useUsers();
  const { data: currentUser } = useCurrentUser();

  const searchOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 0) {
        return setSearchUsers([]);
      }

      setSearchUsers(
        allUsers.filter((user: IUser) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    },
    [allUsers, currentUser]
  );

  return (
    <div className="pl-2">
      <div className=" relative w-[21rem] h-12 bg-custom-lightBlack mt-2 ml-8 rounded-full flex justify-start items-center z-50">
        <RiSearchLine className="ml-5 text-custom-lightGray" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="bg-inherit rounded-full pl-3 focus:border-none focus:outline-none text-custom-white"
          onChange={searchOnChange}
        />
        <div className="absolute bg-custom-black top-12 w-full z-10  ">
          {searchUsers.length > 0 && (
            <div className=" shadow-customSecondary rounded-lg ">
              {searchUsers.map((user: IUser) => {
                return (
                  <div
                    onClick={() => {
                      router.push(`/users/${user.username}`);
                      setSearchUsers([]);
                    }}
                    key={user.id}
                    className="flex items-center gap-4 justify-between py-2 px-4 hover:bg-neutral-700 hover:bg-opacity-70 cursor-pointer duration-200"
                  >
                    <Avatar username={user.username} size="small" />
                    <div className="flex flex-col flex-1">
                      <h3
                        className="text-white font-bold text-sm text-ellipsis w-fit max-w-[8rem] whitespace-nowrap overflow-hidden hover:underline text-left"
                        title={user.name}
                      >
                        {user.name}
                      </h3>
                      <h5 className="text-gray-500 text-sm text-left">
                        @{user.username}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
