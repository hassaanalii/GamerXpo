"use client"
import styles from './page.module.css'
const Feedbacks = ({ gameId }) => {

    const handleFeedbackSubmit = () =>{
        console.log(gameId)
    }
    return (
        <div className="mt-10">
            <h2 className="text-lg font-bold">Feedback</h2>
            <form
                onSubmit={handleFeedbackSubmit}
                className={styles.feedbackForm}
            >
                <textarea
                    className="border p-2 w-full rounded-md shadow-sm text-[12px] font-poppins"
                    placeholder="Write your feedback here..."
                    required
                ></textarea>
                <button type="submit" className="bg-cgreen px-5 py-2 rounded-md mt-2 hover:bg-cgreen/90">
                    <p className="font-semibold text-[12px] font-poppins text-white">
                        Submit Feedback
                    </p>
                </button>
            </form>
           
        </div>
    )
}

export default Feedbacks;