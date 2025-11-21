export function ProcessingLoader() {
    return (
        <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mb-4"></div>
            <p className="text-[clamp(16px,2vw,18px)] font-medium text-black">
                Processing your file...
            </p>
        </div>
    )
}
