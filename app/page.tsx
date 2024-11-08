import Image from "next/image";
import Link from 'next/link'

export default function Home() {
	return (
		<div className="bg-black">
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]">
				<Link
					href="/classroomrandomizer"
					className="flex items-center gap-5 self-start rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
				>
					Go to Classroom Randomizer
				</Link>
			</div>
		<div className="bg-black">
			<div 
				className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]" 
				style={{ gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))", height: '100vh' }}
			>
				<h1 className="text-5xl font-bold"> Classroom Randomizer </h1>
				<Image 
					src="/image.png"
					alt="Classroom"
					width={181}
					height={143}
				/>
				<Link
					href="/seatingchart"
					className="flex items-center gap-5 self-start rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
				>
					Go to Seating Chart Randomizer
				</Link>
				<Link 
					href="/group"
					className="items-center gap-5 self-start rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
				>
					Go to Group Randomizer
				</Link>
			</div>
		</div>
	);
}
