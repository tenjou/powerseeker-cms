import styled from "styled-components"
import type { Project } from "../../Types"

interface ExportProps {
    project: Project
}
const Export = ({ project }: ExportProps) => {
    const output = JSON.stringify(project, null, 4)

    return (
        <ExportContainer>
            <Pre>{output}</Pre>
        </ExportContainer>
    )
}

const ExportContainer = styled.div`
    width: 100%;
`

const Pre = styled.pre`
    user-select: all;
`

export default Export
