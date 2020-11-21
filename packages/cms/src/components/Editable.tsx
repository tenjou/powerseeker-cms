import React, { createRef, useState } from "react"

export type ClipboardEventEx<T> = React.ClipboardEvent<T> & {
    originalEvent: {
        clipboardData: {
            getData: (type: string) => string
        }
    }
}

const noop = () => {}

export default function Editable<T>({
    value,
    placeholder,
    onChange,
    useRightClick = false,
}: {
    value: T
    placeholder: string
    onChange: (value: string) => void
    useRightClick?: boolean
}) {
    const ref = createRef<HTMLDivElement>()
    const [editable, setEditable] = useState(false)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === "Escape") {
            ref.current?.blur()
        }
    }

    const handlePaste = (event: ClipboardEventEx<HTMLDivElement>) => {
        event.preventDefault()

        let text = ""
        if (event.clipboardData || event.originalEvent.clipboardData) {
            text = (event.originalEvent || event).clipboardData.getData(
                "text/plain"
            )
        } else if (window.clipboardData) {
            text = window.clipboardData.getData("Text")
        }

        if (document.queryCommandSupported("insertText")) {
            document.execCommand("insertText", false, text)
        } else {
            document.execCommand("paste", false, text)
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        const text = event.currentTarget.textContent || ""
        onChange(text !== placeholder ? text : "")

        event.currentTarget.contentEditable = "false"
        setEditable(false)
        window.getSelection()?.removeAllRanges()
    }

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (editable) {
            event.preventDefault()
            event.stopPropagation()
            return
        }

        if (event.detail % 2) {
        } else {
            event.stopPropagation()
            setEditable(true)
            event.currentTarget.contentEditable = "true"
            event.currentTarget.focus()
            window.getSelection()?.selectAllChildren(event.currentTarget)
        }
    }

    const showText = editable ? `${value}` : value ? `${value}` : placeholder
    let style = ""

    return (
        <div
            className={style}
            suppressContentEditableWarning={true}
            onKeyDown={handleKeyDown}
            onClick={useRightClick ? noop : handleClick}
            onPaste={handlePaste}
            onBlur={handleBlur}
            onContextMenu={useRightClick ? handleClick : noop}
            ref={ref}
            spellCheck={false}
        >
            {showText}
        </div>
    )
}
