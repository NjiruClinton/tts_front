import Link from "next/link"
import styles from '@/styles/Hero.module.css'
import ChartSVG from "../../public/chart.svg"
import CalendarSVG from "../../public/calendar.svg"
import SettingsSVG from "../../public/settings.svg"
import TaskSVG from "../../public/task.svg"
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {

    const featuresList = [
        {
            img: TaskSVG,
            title: "Create  and manage tasks",
            description: "Effortlessly create and manage tasks with our intuitive system. Quickly capture and prioritize to-dos, from simple reminders to complex projects. Our smart interface adapts to your unique workflow.",
        },
        {
            img: ChartSVG,
            title: "Analyze your tasks",
            description: "Turn data into action with our powerful analytics. Uncover productivity trends, optimize your workflow, and make informed decisions that boost your efficiency.",
        },
        {
            img: CalendarSVG,
            title: "View your Tasks Deadline",
            description: "Visualize your schedule like never before. Our dynamic calendar puts you in control, making rescheduling as simple as drag and drop. Time management, simplified.",
        },
        {
            img: SettingsSVG,
            title: "Customize Your Task Experience",
            description: "Make this task manager truly yours. With our built-in configurator, personalize every aspect of your experience, from notifications to integrations. Your workflow, your way.",
        }
    ]
    
    
  return (
    <>
        <main>
            <Navbar />
            <div className="mx-auto max-w-[80%] text-center mt-24 flex flex-col items-center space-y-8">

                <h1 className="text-[48px]">Task Management Made Easy
                </h1>
                <p className="!text-[20px] text-[#595759]">
                    Streamline your productivity and conquer your task to-do list with our intuitive task
                    <br/> manager, designed to help you work smarter, not harder.
                </p>
                <div className="flex justify-center items-center">
                    <Link href="admin"
                              className="bg-[#000000] !text-[16px] p-[16px] text-[#ffff] rounded-[8px] flex items-center font-[500]">
        <span> Get Started Now
        </span>
                        <img src="/arrowup.svg" alt="dashboard"/>
                    </Link>
                </div>
                <div className={styles['hero-container']}>
                    <img src="/HeroImg.png" alt="Hero Image" className={styles['hero-img']}/>
                </div>

            </div>


            <div className="mx-auto max-w-[80%] text-left mt-24 flex flex-col space-y-8">
                <h1 className="text-[30px]">Streamline Your Workflow, Your Productivity</h1>
                <p className="!text-[16px] text-[#595759]">
                    We consider all the drivers of change gives you the blocks & components <br /> you need to change to create a
                    truly professional website.
                </p>
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {featuresList.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col text-left p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex justify-center items-center h-24 mb-4">
                                    <Image 
                                        src={feature.img}
                                        alt={`${feature.title} illustration`}
                                        width={64}
                                        height={64}
                                        className="object-contain"
                                    />
                                </div>
                                <h2 className="text-xl font-bold mb-2 text-gray-800 leading-tight tracking-tight">{feature.title}</h2>
                                <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </main>
    </>
  )}
