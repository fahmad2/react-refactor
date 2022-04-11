import React from "react";
import { Text, Box, Spacer } from "@chakra-ui/react";

export const TodoListHeadings = [
    <Text
      fontSize={12}
      px={6}
      py={3}
      textTransform="uppercase"
      width={100}
    >
      Done
    </Text>,
    <Text fontSize={12} px={6} py={3} textTransform="uppercase">
      Description
    </Text>,
    <Text
      fontSize={12}
      px={6}
      py={3}
      textTransform="uppercase"
    ></Text>
];

export const UserListHeadings = [
    <Box>
      <Text
        fontSize={12}
        px={6}
        py={3}
        textTransform="uppercase"
        width={100}
      >
        Image
      </Text>
    </Box>,
    <Box px={6} py={3} flexBasis="100px">
      <Text fontSize={12} textTransform="uppercase">
        Name
      </Text>
    </Box>,
    <Box px={6} py={3}>
      <Text fontSize={12} textTransform="uppercase">
        Email
      </Text>
    </Box>,
    <Spacer />,
    <Box px={6} py={3}>
      <Text fontSize={12} textTransform="uppercase">
        Followers
      </Text>
    </Box>,
  ];