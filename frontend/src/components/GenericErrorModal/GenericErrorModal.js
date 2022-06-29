
function GenericErrorModal ({setShowModal, errors}) {



return(
    <div className="ERROR-MODAL">
        <div className='ErrorTitle'>Error</div>
        {errors.map((error,i)=>{
           return <div key={i} className='ErrorMessage'>{error}</div>
        })}

        <div className='modal-bttns'>

        <button className='modal-OK' onClick={()=>setShowModal(false)}>OK</button>
        </div>
    </div>
)
}


export default GenericErrorModal
