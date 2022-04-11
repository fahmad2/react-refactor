import {
  Box,
  Flex,
  ListItem,
  Spacer,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { User } from "./types/User";
import MyTable from "./MyTable";
import { DataModel } from "./MyTable/types";
import { UserListHeadings } from "./constants/constants";

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      if (data) setUsers(data);
    }
    getUsers();
  });

  const dataModel: DataModel<User> = (user, index) => (
    <ListItem key={user.id}>
        <Flex
          alignItems="center"
          bg={index % 2 === 0 ? "gray.100" : "white"}
        >
          <Box px={6} py={4}>
            <Image src={user.avatarUrl} />
          </Box>
          <Box px={6} py={4} flexBasis="100px">
            <Text fontSize={16} textTransform="capitalize">
              {user.username}
            </Text>
          </Box>
          <Box px={6} py={4}>
            <Text fontSize={16}>
              <Link href={`mailto:${user.email}`}>{user.email}</Link>
            </Text>
          </Box>
          <Spacer />
          <Box px={6} py={4}>
            <Text fontSize={16}>{user.followers.length}</Text>
          </Box>
        </Flex>
      </ListItem>
  );

  return (
    <>
      <MyTable 
        header="Users"
        headings={UserListHeadings}
        data={users}
        dataModel={dataModel}
      />
    </>
  );
}

export default Users;
