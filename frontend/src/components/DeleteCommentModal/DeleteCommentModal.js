
function DeleteCommentModal ({setShowModal}) {



return(
    <div className="ERROR-MODAL">
        <div className='ErrorTitle'>Alert</div>
        <div className='ErrorMessage'>Delete this Comment?</div>
        <div className='modal-bttns'>
        <button className='modal-cancel' onClick={()=>setShowModal(false)}>Close</button>
        <button className='modal-OK' onClick={()=>setShowModal(false)}>OK</button>
        </div>
    </div>
)
}


export default DeleteCommentModal
