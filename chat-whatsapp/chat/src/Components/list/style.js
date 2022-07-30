import styled from 'styled-components'


export const ContainerLI = styled.div`
display: ${(prop)=>prop.display == true ? "" : "none"};

`

export const Li = styled.li`
display: flex;
border-bottom: 1px solid Gainsboro ;
align-items: center;
` 
export const ImgProfile = styled.img`
margin: 1rem;
border-radius: 100%;
width: 50px;
`

export const Paragraf = styled.span`

`