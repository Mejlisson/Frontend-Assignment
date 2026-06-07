type CartModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

function CartModal({ isOpen, onClose }: CartModalProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
			<button
				type="button"
				aria-label="Close cart modal"
				onClick={onClose}
				className="absolute inset-0 bg-black/30"
			/>
			<section className="absolute right-0 top-0 h-full w-162 max-w-full bg-[#FAF9F6] p-6 shadow-2xl">
				<h2 className="text-xl font-semibold text-zinc-900">Varukorg</h2>
			</section>
		</div>
	);
}

export default CartModal;
