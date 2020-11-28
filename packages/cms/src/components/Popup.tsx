import type { ReactNode } from "react"
import styled from "styled-components"

type PopupProps = {
    children: ReactNode
    header: string
}
const Popup = ({ children, header }: PopupProps) => {
    return (
        <PopupBody>
            <PopupHeader>
                <PopupHeaderText>{header}</PopupHeaderText>
                <button>Close</button>
            </PopupHeader>
            <PopupContent>{children}</PopupContent>
        </PopupBody>
    )
}

const PopupBody = styled.div`
    width: 500px;
    height: 350px;
    padding: 10px;
    background: #fff;
`

const PopupHeader = styled.div`
    display: flex;
    margin-bottom: 10px;
`

const PopupHeaderText = styled.div`
    display: flex;
    flex: 1;
    font-weight: bold;
    font-size: 20px;
`

const PopupContent = styled.div``

export default Popup
