"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import { Link as MuiLink } from '@mui/material';
import { 
  Box,
  Typography
} from "@mui/material";

const navigation = [
    {
      name: "Main",
      href: "/",
    },
    {
      name: "Competitions",
      href: "/competition",
    },
  
    {
      name: "Leaderboard",
      href: "/leaderboard",
    },
    {
      name: "Settings",
      href: "/setting",
    },
] satisfies { name: string; href: string; external?: boolean }[];

export default function Header() {
  return (
    <Box sx={{ display: { xs: "none", md: "flex"} , justifyContent: "space-between" }}>
      <Typography variant="h4">Do Not Give Up</Typography>
      <div className="justify-evenly">
        {navigation.map((item) => (
          <MuiLink component={Link} href={item.href}>
            <Button variant="text">{item.name}</Button>
          </MuiLink>)
        )}
      </div>
    </Box>
  );
}