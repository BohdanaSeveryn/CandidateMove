type Props = {
    onSelect: (color: "black" | "white") => void
}

export default function PieceSelector({ onSelect }: Props) {
    return (
        <div style={{ padding: '10px' }}>
            <div
            className="piece black"
            onClick={() => onSelect("black")}
            style={{ cursor: 'pointer' }}
            />
            <div
            className="piece white"
            onClick={() => onSelect("white")}
            style={{ cursor: 'pointer' }}
            />
        </div>
    )
}