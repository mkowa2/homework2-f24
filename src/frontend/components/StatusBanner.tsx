import React, { useState, useEffect } from 'react'
import '../public/StatusBanner.css'


// Implement the StatusBannerProps interface.
interface StatusBannerProps {
    message: string,
    onClose: () => void,
}

const StatusBanner: React.FC<StatusBannerProps> = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true)

    // If there is a message to be shown, display it for 5 seconds and then close the banner.
    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setIsVisible(false)
                onClose()
            }, 5000);
        
        }
    }, [message, onClose])

    return (
        <>
            {!isVisible && <></>}
            {isVisible && (
                <div className="status-banner">
                    <p>{message}</p>
                    <button
                        onClick={() => {
                            setIsVisible(false)
                            onClose()
                        }}
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    )
}

export default StatusBanner
