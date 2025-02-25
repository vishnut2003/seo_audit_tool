
const SkeletonLoader = () => {
    return (
        [1, 2, 3].map((row) => (
            <div
                key={row}
                className='pb-3 mb-3 border-b border-gray-100 flex flex-nowrap justify-between items-center'
            >
                <div
                    className='flex flex-col gap-2 w-full'
                >
                    <div
                        className="w-[70%]"
                    >
                        <SkeletonEffect/>
                    </div>
                    
                    <div
                        className="w-[40%]"
                    >
                        <SkeletonEffect/>
                    </div>
                </div>
            </div>
        ))
    )
}

const SkeletonEffect = () => (
    <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
);

export default SkeletonLoader