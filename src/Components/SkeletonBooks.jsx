import React from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack"


export default function SkeletonBooks(){
	const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8]

	return(
		<Grid container spacing={3} sx={{px: "3%"}}>
			{arrayNumbers.map((number) => (
				<Grid item key={number} xs={12} sm={6} md={4} lg={3}>
					<Stack spacing={3}>
						<Skeleton variant="rectangular" sx={{
							height: {
								xs: 500,
								sm: 500,
								md: 300,
								lg: 300, 
								xl: 300
							}, width: "100%"
						}}/>
						<Skeleton variant="rectangular" height={32} sx={{width: "80%"}}/>
					</Stack>
				</Grid>
			))}	
		</Grid>
	)
}
