import { FiTruck } from 'react-icons/fi';
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from 'react-icons/hi2';
import { useEffect, useRef, useState } from 'react';
import klarnaLogo from '../assets/Klarna.svg';
import swishLogo from '../assets/Swish.svg';
import visaLogo from '../assets/Visa.svg';
import mastercardLogo from '../assets/Mastercard.svg';
import CartItem from './CartItem.tsx';
import CrossSellModule from './CrossSellModule.tsx';
import { crossSellProducts, initialCartItems } from '../data/mockData';
import type { CartItem as CartItemModel } from '../data/mockData';

type CartModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

function CartModal({ isOpen, onClose }: CartModalProps) {
	const [cartItems, setCartItems] = useState<CartItemModel[]>(initialCartItems);
	const baseShipping = 49;
	const freeShippingThreshold = 900;
	const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
	const hasFreeShipping = subtotal >= freeShippingThreshold;
	const shipping = subtotal === 0 || hasFreeShipping ? 0 : baseShipping;
	const total = subtotal + shipping;
	const isCartEmpty = cartItems.length === 0;
	const amountLeftForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
	const crossSellContainerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const repeatedCrossSellIds = Array.from(
		{ length: 12 },
		(_, index) => crossSellProducts[index % crossSellProducts.length].id
	);

	const resetCartItems = () => initialCartItems.map((item) => ({ ...item }));

	const handleCloseModal = () => {
		setCartItems(resetCartItems());
		setCanScrollLeft(false);
		setCanScrollRight(false);
		if (crossSellContainerRef.current) {
			crossSellContainerRef.current.scrollLeft = 0;
		}
		onClose();
	};

	const handleIncreaseQuantity = (productId: number) => {
		setCartItems((current) =>
			current.map((item) =>
				item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};
	// Decrease quantity or remove item if quantity goes to 0
	const handleDecreaseQuantity = (productId: number) => {
		setCartItems((current) =>
			current
				.map((item) => {
					if (item.product.id !== productId) {
						return item;
					}

					return { ...item, quantity: item.quantity - 1 };
				})
				.filter((item) => item.quantity > 0)
		);
	};
	// Add cross-sell product to cart or increase quantity if it already exists in the cart
	const handleAddCrossSell = (productId: number) => {
		const selectedProduct = crossSellProducts.find((product) => product.id === productId);
		if (!selectedProduct) {
			return;
		}
		// Reuse the increase quantity logic if the product is already in the cart
		setCartItems((current) => {
			const existingItem = current.find((item) => item.product.id === productId);
			if (existingItem) {
				return current.map((item) =>
					item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
				);
			}

			return [...current, { product: selectedProduct, quantity: 1 }];
		});
	};

	const handleCrossSellScroll = (direction: 'left' | 'right') => {
		const container = crossSellContainerRef.current;
		if (!container) {
			return;
		}

		const offset = direction === 'right' ? 420 : -420;
		container.scrollBy({ left: offset, behavior: 'smooth' });
	};

	const updateCrossSellScrollState = () => {
		const container = crossSellContainerRef.current;
		if (!container) {
			setCanScrollLeft(false);
			setCanScrollRight(false);
			return;
		}

		const maxScrollLeft = container.scrollWidth - container.clientWidth;
		setCanScrollLeft(container.scrollLeft > 1);
		setCanScrollRight(container.scrollLeft < maxScrollLeft - 1);
	};

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const frameId = window.requestAnimationFrame(updateCrossSellScrollState);
		window.addEventListener('resize', updateCrossSellScrollState);

		return () => {
			window.cancelAnimationFrame(frameId);
			window.removeEventListener('resize', updateCrossSellScrollState);
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-40" aria-modal="true" role="dialog">
            {/* Overlay to close modal when clicking outside */}
			<button
				type="button"
				aria-label="Close cart modal"
				onClick={handleCloseModal}
				className="absolute inset-0 bg-black/30"
			/>
			<section className="absolute right-0 top-0 h-full w-full sm:w-[648px] bg-(--color-surface) font-['Sofia_Pro','Avenir_Next_LT',sans-serif]">
				<div className="flex h-full flex-col px-6 py-4">
					<header className="flex items-center justify-between border-b border-(--color-border)/30 pb-4">
						<h2 className="hidden text-[18px] font-semibold tracking-[-0.46px] text-(--color-text-primary) sm:block">
							Din varukorg
						</h2>
						<button
							type="button"
							aria-label="Stang varukorg"
							onClick={handleCloseModal}
							className="ml-auto -mr-4 flex h-10 w-12 items-center justify-center p-0 text-(--color-text-primary) cursor-pointer"
						>
							<HiOutlineXMark size={30} />
						</button>
					</header>

					{/* Show empty state if cart is empty, otherwise show cart items and cross-sell section */}
					{isCartEmpty ? (
						<div className="flex flex-1 flex-col items-center justify-center pb-40">
							<p className="text-[24px] font-semibold leading-none text-(--color-text-primary)">Din kundvagn är tom</p>
							<button
								type="button"
								onClick={handleCloseModal}
								className="mt-8 h-[48px] w-[151px] rounded-[6px] bg-(--color-primary-green) text-[16px] font-semibold text-(--color-button-text) transition-colors hover:bg-(--color-primary-green-dark)"
							> Fortsätt handla
							</button>
						</div>
					) : (
						<div className="no-scrollbar mt-4 flex flex-1 flex-col gap-4 overflow-y-auto">
							<section className="flex flex-col gap-4">
								<div
									className={`flex h-12 w-full items-center justify-center gap-2 py-3 text-(--color-text-secondary) ${
										hasFreeShipping ? 'bg-[#dcecd7]' : 'bg-(--color-surface-soft) px-4'
									}`}
								>
									{/* Shipping info */}
									<FiTruck size={18} className="shrink-0" aria-hidden="true" />
									<p className="text-[14px] font-medium leading-5">
										{hasFreeShipping
											? 'Du har GRATIS standardfrakt!'
											: `GRATIS frakt från 900kr! Du behöver spendera ${amountLeftForFreeShipping} kr för att få gratis frakt.`}
									</p>
								</div>

								<div aria-label="Cart items" className="space-y-4 pb-4">
									{cartItems.map((item) => (
										<CartItem
											key={item.product.id}
											item={item}
											onIncrease={() => handleIncreaseQuantity(item.product.id)} //+ item to cart
											onDecrease={() => handleDecreaseQuantity(item.product.id)} //- item to cart or remove if quantity is 0
										/>
									))}
								</div>
							</section>

							{/* ⭐⭐⭐ Redesigned element ⭐⭐⭐*/}
							<section className="rounded-[10px] bg-(--color-surface-muted) px-4 py-6" aria-label="Matchande produkter">
								<h3 className="text-left text-[18px] font-semibold leading-5 text-(--color-text-primary)">
									Matchande produkter
								</h3>
								<div className="relative mt-4">
									<div
										ref={crossSellContainerRef}
										onScroll={updateCrossSellScrollState}
										className="no-scrollbar flex gap-3 overflow-x-auto pb-1"
									>
										{/* Mapping products */}
										{repeatedCrossSellIds.map((productId, index) => (
											<CrossSellModule
												key={`${productId}-${index}`}
												productId={productId}
												products={crossSellProducts}
												onAdd={handleAddCrossSell}
											/>
										))}
									</div>
									<button
										type="button"
										aria-label="Scroll to left"
										onClick={() => handleCrossSellScroll('left')}
										disabled={!canScrollLeft}
										className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-(--color-text-primary) shadow-sm cursor-pointer disabled:opacity-0"
									>
										<HiChevronLeft size={22} />
									</button>
									<button
										type="button"
										aria-label="Scroll to right"
										onClick={() => handleCrossSellScroll('right')}
										disabled={!canScrollRight}
										className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-(--color-text-primary) shadow-sm cursor-pointer disabled:opacity-0"
									>
										<HiChevronRight size={22} />
									</button>
								</div>
							</section>

							{/*Payment details section*/}
							<section className="border-t border-(--color-border)/30 py-12" aria-label="Payment details">
								<div className="space-y-2 text-(--color-text-primary)">
									<div className="flex items-center justify-between text-[16px] font-normal leading-4 ">
										<span>Delsumma</span>
										<span>{subtotal} kr</span>
									</div>
									<div className="flex items-center justify-between text-[16px] font-normal leading-5">
										<span>Leverans</span>
										<span>{shipping} kr</span>
									</div>
									<div className="flex items-center justify-between pt-3 text-[18px] font-bold leading-8.25">
										<span>Totalsumma</span>
										<span>{total} kr</span>
									</div>
								</div>

								<button
									type="button"
									className="mt-4 h-[48px] w-full rounded-[5px] bg-(--color-primary-green) text-[16px] font-bold text-(--color-button-text) transition-colors hover:bg-(--color-primary-green-dark)"
								>
									Ga till kassan
								</button>

								<div className="mt-4 flex items-center justify-center gap-4 lg:gap-6 py-2">
									<img src={klarnaLogo} alt="Klarna" className="h-5 w-auto" />
									<img src={swishLogo} alt="Swish" className="h-5 w-auto" />
									<img src={visaLogo} alt="Visa" className="h-5 w-auto" />
									<img src={mastercardLogo} alt="Mastercard" className="h-5 w-auto" />
								</div>
							</section>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}

export default CartModal;
