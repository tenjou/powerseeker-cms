import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { RootState } from "../app/RootReducer"
import ProjectService from "../features/project/ProjectService"
import { Project } from "../Types"

const NavBarBody = styled.div`
    display: flex;
    flex: 0 0 40px;
    background-color: black;
    color: white;
    align-items: center;
    padding: 0 10px;
`

const NavTitle = styled(Link)`
    padding-right: 10px;
    color: #fff;
    font-weight: 500;
    text-decoration: none;
`

const NavLink = styled(Link)`
    color: #00bcd4;
    font-size: 12px;
    font-weight: bold;
    padding: 0 5px;
`

type NavBarProps = {
    project: Project
}
const NavBar = ({ project }: NavBarProps) => {
    const selectedAssetId = useSelector((state: RootState) => state.cache.selectedAssetId)

    const projectPath = ProjectService.createPath()

    return (
        <NavBarBody>
            <NavTitle to={`${projectPath}/asset/${selectedAssetId}`}>{project.meta.name}</NavTitle>
            <NavLink to="/import">Import</NavLink>
            <NavLink to={`${projectPath}/export`}>Export</NavLink>
        </NavBarBody>
    )
}

export default NavBar
