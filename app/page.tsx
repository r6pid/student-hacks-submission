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
		</div>
	);
}
