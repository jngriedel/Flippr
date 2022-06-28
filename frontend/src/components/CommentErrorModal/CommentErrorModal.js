import './CommentErrorModal.css'
function CommentErrorModal ({setShowModal}) {



return(
    <div className="ERROR-MODAL">
        <div className='ErrorTitle'>Error</div>
        <div className='ErrorMessage'>An empty comment box? That won't work!</div>
        <div className='modal-bttns'>
        <button onClick={()=>setShowModal(false)}>Close</button>
        <button className='bttn modalOK' onClick={()=>setShowModal(false)}>OK</button>
        </div>
    </div>
)
}


export default CommentErrorModal
