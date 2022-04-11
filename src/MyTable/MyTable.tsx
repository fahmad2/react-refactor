import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Center,
    Flex,
    Heading,
    List,
    ListItem,
    Button,
    Text,
    Input,
} from "@chakra-ui/react";
import { MyTableProps } from "./types";

export const MyTable = <T extends unknown>({
    header,
    headings,
    data,
    dataModel,
    footer,
    pageSize = 5,
}: MyTableProps<T>) => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const searchedData = useMemo(() => {
        if(searchTerm === '') return data;

        const normalizedSearchTerm = searchTerm.toLowerCase();

        return data.filter((item) => {
            for(let prop in item) {
                if(prop == 'id') continue;

                const value = item[prop];
                if(typeof value === 'string') {
                    const normalizedValue = value.toLowerCase();
                    if(normalizedValue.indexOf(normalizedSearchTerm) != -1) {
                        return true;
                    }
                }
            }
            return false;
        });
    }, [data, searchTerm]);

    useEffect(() => {
        if(page > 0 && pageSize * page >= searchedData.length) {
            setPage((page) => page - 1);
        }
    },[searchedData]);

    const paginatedData = useMemo(() => {
        const startIndex = pageSize * page;
        const endIndex = startIndex + pageSize;
        return searchedData.slice(startIndex, endIndex);
    }, [page, searchedData, pageSize]);

    const hasMoreRows = useMemo(() => {
        return (pageSize * (page + 1)) < searchedData.length;
    }, [page, pageSize, searchedData]);

    const nextPageClicked = () => {
        setPage((page) => page + 1);
    }

    const prevPageClicked = () => {
        setPage((page) => page - 1);
    }

    return (
        <>
            <Center>
                <Box p={4} width="640px">
                    <Heading>{header}</Heading>
                </Box>
            </Center>

            <Flex justifyContent='flex-end' align='center'>
                <Box width={250}>
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Flex>

            <Center alignItems="baseline">
                <Box width="640px">
                <List>
                    <ListItem>
                        <Flex alignItems="center" color="gray.600" fontWeight={600}>
                            {headings}
                        </Flex>
                    </ListItem>

                    {paginatedData.map(dataModel)}
                </List>
                </Box>
            </Center>

            { footer &&
                <Center>
                    <Box p={4} width="640px" bg="gray.50">
                    {footer}
                    </Box>
                </Center>
            }

            <Flex justifyContent='flex-end' align='center'>
                <Box p={4}>
                    <Button
                        disabled={page == 0}
                        onClick={prevPageClicked}
                    >Prev</Button>
                </Box>
                <Box width={100}>
                    <Text fontSize={16} align="center">
                        Page {page + 1}
                    </Text>
                </Box>
                
                <Box p={4}>
                    <Button
                        disabled={!hasMoreRows}
                        onClick={nextPageClicked}
                    >Next</Button>
                </Box>
            </Flex>
            
        </>
    );
}