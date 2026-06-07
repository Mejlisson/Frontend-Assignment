import { FiTruck } from 'react-icons/fi';
import { HiOutlineXMark } from 'react-icons/hi2';
import type { WheelEvent } from 'react';
import klarnaLogo from '../assets/Klarna.svg';
import swishLogo from '../assets/Swish.svg';
import visaLogo from '../assets/Visa.svg';
import mastercardLogo from '../assets/Mastercard.svg';
import CartItem from './CartItem.tsx';
import CrossSellModule from './CrossSellModule.tsx';
import { crossSellProducts, initialCartItems } from '../data/mockData';

type CartModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

function CartModal({ isOpen, onClose }: CartModalProps) {
	const repeatedCrossSellIds = Array.from(
		{ length: 12 },
		(_, index) => crossSellProducts[index % crossSellProducts.length].id
	);

	const handleCrossSellWheel = (event: WheelEvent<HTMLDivElement>) => {
		const container = event.currentTarget;

		if (event.deltaY === 0) {
			return;
		}

		event.preventDefault();
		container.scrollLeft += event.deltaY;
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-40" aria-modal="true" role="dialog">
            {/* Overlay to close modal when clicking outside */}
			<button
				type="button"
				aria-label="Close cart modal"
				onClick={onClose}
				className="absolute inset-0 bg-black/30"
			/>
			<section className="absolute right-0 top-0 h-full w-162 max-w-full bg-(--color-surface) font-['Sofia_Pro','Avenir_Next_LT',sans-serif]">
				<div className="flex h-full flex-col gap-4 overflow-y-auto px-6 py-0">
					
                    {/* Top section with title */}
                    <section className="flex flex-col gap-4">
						<header className="flex items-center justify-between border-b border-(--color-border)/30 py-3">
							<h2 className="text-[18px] font-semibold leading-4 tracking-[-0.46px] text-(--color-text-primary)"
                                >Din varukorg
                            </h2>
							<button
								type="button"
								aria-label="Stang varukorg"
								onClick={onClose}
								className="-mr-4 flex h-12 w-12 items-center justify-center p-0 text-(--color-text-primary) cursor-pointer"
							>
								<HiOutlineXMark size={30} />
							</button>
						</header>

                        {/* CartItem */}
						<div aria-label="Cart item" className="pb-4">
							<CartItem item={initialCartItems[0]} />
						</div>
					</section>

					{/* CrossSellProducts */}
					<section className="rounded-[10px] bg-(--color-surface-muted) px-3 py-6" aria-label="Matchande produkter">
						<h3 className="text-left text-[18px] font-semibold leading-5 text-(--color-text-primary)">
							Matchande produkter
						</h3>
						<div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1" onWheel={handleCrossSellWheel}>
							{repeatedCrossSellIds.map((productId, index) => (
								<CrossSellModule key={`${productId}-${index}`} productId={productId} products={crossSellProducts} />
							))}
						</div>
					</section>

					<div className="flex h-12 w-162 items-center justify-center gap-3 bg-(--color-surface-soft) px-17.5 py-3 text-(--color-text-secondary)">
						<FiTruck size={20} className="shrink-0" aria-hidden="true"/>
							<p className="text-[14px] font-medium leading-7">
								GRATIS frakt från 900kr! Du behöver spendera 551 kr för att få gratis frakt.
							</p>
					</div>

                    {/* Payment section */}
					<section className="border-t border-(--color-border)/30 py-8" 
                        aria-label="Betalningsuppgifter">
						<div className="space-y-2 text-(--color-text-primary)">
							<div className="flex items-center justify-between text-[16px] font-normal leading-4 ">
								<span>Delsumma</span>
								<span>349 kr</span>
							</div>
							<div className="flex items-center justify-between text-[16px] font-normal leading-4">
								<span>Leverans</span>
								<span>49 kr</span>
							</div>
							<div className="flex items-center justify-between pt-3 text-[18px] font-bold leading-8.25">
								<span>Totalsumma</span>
								<span>398 kr</span>
							</div>
						</div>

						<button
							type="button"
							className="mt-6 h-16 w-full rounded-[5px] bg-(--color-primary-green) text-[18px] font-semibold text-(--color-button-text)"
						>
							Ga till kassan
						</button>

						<div className="mt-4 flex items-center justify-center gap-8.75 px-6 py-4.25">
							<img src={klarnaLogo} alt="Klarna" className="h-8 w-auto" />
							<img src={swishLogo} alt="Swish" className="h-8 w-auto" />
							<img src={visaLogo} alt="Visa" className="h-8 w-auto" />
							<img src={mastercardLogo} alt="Mastercard" className="h-8 w-auto" />
						</div>
					</section>
				</div>
			</section>
		</div>
	);
}

export default CartModal;
