import useDraggable from '../../hooks/useDraggable';

const Dialog = ({closeHandler}) => {
  const draggableref = useDraggable();

  return (
    <div className="my-dialog" ref={draggableref} draggable={true}>
        <div className="dialog-info">Hey This Is A Dialog</div>
        <button onClick={closeHandler}>Close Me</button>
    </div>
  )
}

export default Dialog;