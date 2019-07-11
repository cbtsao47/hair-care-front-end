import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
width: 100%;
background: #1d0b32;

	h1 {
		font-size: 4rem;
		text-align: center;
		padding: 20px;
		font-family: 'Fredoka One';
		color: #f9899e;
		margin: 20px;
	}
`;

const Header = () => {
	return(
		<StyledHeader>
			<h1>Stylogue</h1>
		</StyledHeader>
	);
};

export default Header;
