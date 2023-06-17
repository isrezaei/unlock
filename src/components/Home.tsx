"use client"
import React from 'react';
import {Container, Text} from "@nextui-org/react";

const Home = () => {
    return (
        <Container>
            <Text

                h1
                size={60}
                css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    textAlign: "center"
                }}
                weight="bold"
            >
                I FEEL LIKE HOME
            </Text>
        </Container>
    );
};

export default Home;