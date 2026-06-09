import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiMinus, FiPlus } from 'react-icons/fi';
import type { CartItem as CartItemModel } from '../data/mockData';

type CartItemProps = {
	item: CartItemModel;
	onIncrease: () => void;
	onDecrease: () => void;
};

type QuantityButton = 'minus' | 'plus';
type AnimationPhase = 'idle' | 'slideOut' | 'check' | 'slideIn';

function CartItem({ item, onIncrease, onDecrease }: CartItemProps) {
	const { product, quantity } = item;
	const linePrice = product.price * quantity;
	const [animationState, setAnimationState] = useState<{ button: QuantityButton | null; phase: AnimationPhase }>({
		button: null,
		phase: 'idle'
	});
	const timersRef = useRef<number[]>([]);

	useEffect(() => {
		return () => {
			timersRef.current.forEach((timer) => window.clearTimeout(timer));
		};
	}, []);

	const triggerConfirmation = (button: QuantityButton) => {
		if (button === 'plus') {
			onIncrease();
		} else {
			onDecrease();
		}

		timersRef.current.forEach((timer) => window.clearTimeout(timer));
		timersRef.current = [];

		setAnimationState({ button, phase: 'slideOut' });

		timersRef.current.push(
			window.setTimeout(() => {
				setAnimationState({ button, phase: 'check' });
			}, 360)
		);

		timersRef.current.push(
			window.setTimeout(() => {
				setAnimationState({ button, phase: 'slideIn' });
			}, 900)
		);

		timersRef.current.push(
			window.setTimeout(() => {
				setAnimationState({ button: null, phase: 'idle' });
			}, 1200)
		);
	};

	const getOriginalIconClass = (button: QuantityButton) => {
		const isCurrentButton = animationState.button === button;
		if (!isCurrentButton || animationState.phase === 'idle') {
			return 'translate-y-0 opacity-100';
		}

		if (animationState.phase === 'slideOut') {
			return 'translate-y-5 opacity-0';
		}

		if (animationState.phase === 'check') {
			return '-translate-y-5 opacity-0';
		}

		return 'translate-y-5 opacity-0';
	};

	const getCheckIconClass = (button: QuantityButton) => {
		const isCurrentButton = animationState.button === button;
		if (!isCurrentButton || animationState.phase === 'idle') {
			return '-translate-y-5 opacity-0';
		}

		if (animationState.phase === 'slideOut') {
			return '-translate-y-5 opacity-0';
		}

		if (animationState.phase === 'check') {
			return 'translate-y-0 opacity-100';
		}

		return 'translate-y-5 opacity-0';
	};

	return (
		<article className="flex gap-4 pb-0" aria-label={product.name}>
			<img src={product.image} alt={product.name} className="h-[144px] w-[110px] object-cover"/>

			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<div>
					<h3 className="text-[16px] font-semibold leading-4 text-(--color-text-primary)">{product.name}</h3>
					<p className="text-[14px] font-medium leading-6 text-(--color-text-primary)">
						{product.size} | {product.color}
					</p>
					<span className="inline-flex bg-(--color-primary-green-soft) px-1 text-[14px] font-medium leading-6 text-(--color-text-primary)">
						I lager
					</span>
				</div>

				<div className="flex items-end justify-between">
					<div className="flex items-center gap-6">
							<button
								type="button"
								aria-label="Minska antal"
								onClick={() => triggerConfirmation('minus')}
								className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7e4df] text-[#6a6a6a] transition-all duration-150 active:scale-95 hover:opacity-90"
							>
								<span className="relative h-[18px] w-[18px] overflow-hidden">
									<FiMinus
										size={17}
										className={`absolute left-0 top-0 transition-all duration-300 ${getOriginalIconClass('minus')}`}
									/>
									<FiCheck
										size={16}
										className={`absolute left-0 top-0 transition-all duration-300 ${getCheckIconClass('minus')}`}
									/>
								</span>
							</button>
							<span className="flex min-w-4 items-center justify-center text-[16px] font-bold leading-none text-(--color-quantity-value)">
								{quantity}
							</span>
							<button
								type="button"
								aria-label="Öka antal"
								onClick={() => triggerConfirmation('plus')}
								className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7e4df] text-[#6a6a6a] transition-all duration-150 active:scale-95 hover:opacity-90"
							>
								<span className="relative h-[18px] w-[18px] overflow-hidden">
									<FiPlus
										size={17}
										className={`absolute left-0 top-0 transition-all duration-300 ${getOriginalIconClass('plus')}`}
									/>
									<FiCheck
										size={16}
										className={`absolute left-0 top-0 transition-all duration-300 ${getCheckIconClass('plus')}`}
									/>
								</span>
							</button>
					</div>

					<p className="text-[16px] font-bold leading-none text-(--color-text-primary)">{linePrice} kr</p>
				</div>
			</div>
		</article>
	);
}

export default CartItem;