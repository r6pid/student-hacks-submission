import Image from "next/image";
import Link from 'next/link'

export default function Home() {
	return (
		<div className="bg-black">
			<div 
				className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]" 
				style={{ gridTemplateRows: "auto auto auto", height: '100vh' }}
			>
				<h1 className="text-5xl font-bold" style={{ color: "white" }}> Classroom Randomizer </h1>
				<h2 className="text-3xl" style={{ color: "white" }}> Requires Java (JDK Oracle) Installed On Computer. If an error pops up, just reload the page. </h2>
				<h2 className="text-3xl" style={{ color: "white" }}> Also get the Java Platform Extension for Visual Studio Code. </h2>
				<Link
					href="/seatingchart"
					className="flex items-center gap-5 self-start rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
				>
					Go to Seating Chart Randomizer
				</Link>
				<Link 
					href="/students"
					className="items-center gap-5 self-start rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
				>
					Edit Students
				</Link>
			</div>
		</div>
	);
}
