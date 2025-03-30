import React from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar";

const faqQuestions = [
    {
        question: "What is ETasks and how does it work?",
        answer:
            "ETasks is a comprehensive task management application designed to help individuals organize, track, and complete their tasks efficiently. It allows users to create, categorize, and prioritize tasks, as well as set deadlines."
    },
    {
        question: "Do I need to have an account to create a task?",
        answer:
            "Yes, an account is required to use the ETasks Dashboard. It's free, quick to set up, and provides secure task storage and personalization. You can start creating tasks immediately after signing up with your email."
    },
    {
        question: "How do I create a new task?",
        answer:
            "Begin by logging in to your account. Click on the 'Tasks' menu in the sidebar, then click the 'New Task' button. Fill in the task details, including the title, description, and due date. Once you've entered all the necessary information, click 'Save' to add the task to your list."
    },
    {
        question: "How can I track the progress of my tasks?",
        answer:
            "You can track task progress in several ways: 1) Use the drag-and-drop feature to mark tasks as 'Open', 'In Progress', or 'Closed'. 2) For more detailed tracking, use the progress bar feature to indicate percentage completion. 3) Check the task statuses in the dashboard for an overview of all tasks."
    },
    {
        question: "Can I prioritize my tasks?",
        answer:
            "Absolutely! You can set priority levels for your tasks, such as Low, Medium, or High. When creating or editing a task, look for the 'Priority' dropdown menu. You can also use the drag-and-drop feature in the task list view to manually reorder tasks based on priority."
    },
    {
        question: "How do I mark a task as completed?",
        answer:
            "To mark a task as completed, simply drag and drop the task in the list view to the 'Completed' section in the task details view. Completed tasks remain visible."
    }
];

const FAQPage: React.FC = () => {
    return (
        <>
            <Navbar />
        <section className="pb-[100px] sm:pb-[100px]  lg:pb-[200px] xl:pb-[200px]">
        <section className="mt-24 mx-auto max-w-[75%]">
            <section className="w-full h-[350px] bg-cover bg-center flex items-center">
                <p className="text-indigo-600 leading-[50.4px] font-semibold sm:text-right lg:text-right xl:text-right text-[65px] sm:text-[20px] lg:text-[42px] xl:text-[42px]">
                    How can we help you?
                    <br />
                    <span className="text-[20px] text-nowrap font-normal italic text-indigo-550">
            "Organize your work and life, finally"
          </span>
                </p>
            </section>

            <section>
                <h1 className="text-[24px] text-[#111827] font-bold leading-[2.5rem]">
                    Frequently asked questions
                </h1>
                <p className="leading-[1.75rem] text-[16px] mt-[15px]">
                    Have a different question and can’t find the answer you’re looking for? Reach out to our <br />
                    support team by
                    <Link href="#" className="text-[#4f46e5] font-semibold">
                        sending us an email
                    </Link>{" "}
                    and we’ll get back to you as soon as we can.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[45px]">
                {faqQuestions.map((faq, index) => (
                    <div key={index}>
                        <h1 className="leading-[1.75rem] text-[16px] font-semibold">{faq.question}</h1>
                        <p className="text-[#595759] text-[16px] leading-[1.73rem] mt-[10px]">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </section>
        </section>
        </section>
        </>
    )
}

export default FAQPage