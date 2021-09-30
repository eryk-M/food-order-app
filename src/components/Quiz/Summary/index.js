import React, { useState, useEffect } from 'react';

import { useLocation, Redirect } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
	CartCompleteOrderId,
	CopyIcon,
	CopyIconContainer,
	ShowCopyMessage,
	CartCompleteOrderContainer,
} from 'components/Cart/CartComplete/CartCompleteElements';

import {
	SummaryContainer,
	SummaryHeading,
	SummaryWinner,
	SummaryNote,
} from './SummaryElements';

import Question from './Question';

const Summary = () => {
	const { data, questions, score, minimumScore } = useLocation();
	const [coupon, setCoupon] = useState('');
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		window.history.pushState(
			null,
			document.title,
			window.location.href
		);
		window.addEventListener('popstate', function () {
			window.history.pushState(
				null,
				document.title,
				window.location.href
			);
		});
		if (questions?.coupon.code) setCoupon(questions.coupon.code);

		// return () => {
		// 	setCoupon('');
		// };
	}, [questions?.coupon.code]);

	if (!data) return <Redirect to="/user/quizes" />;

	const copyTimeout = () => {
		let copy;
		setCopied(true);
		clearTimeout(copy);
		copy = setTimeout(() => {
			setCopied(false);
		}, 3000);
	};
	// const score = data.filter((el) => el.isCorrect).length;

	// const minimumScore = data.length - data.length * 0.2;

	return (
		<SummaryContainer>
			<SummaryHeading>
				Your score <br /> {score} / {data.length}
			</SummaryHeading>
			{score >= minimumScore && (
				<SummaryWinner>
					<SummaryNote>
						<strong>Congratulations!</strong>
						<span>
							You won! <br />
							<br />
							Here is your coupon. <br />
							REMEMBER: You can use it only once.
						</span>
					</SummaryNote>
					<CartCompleteOrderContainer>
						<CartCompleteOrderId>
							<strong>{coupon}</strong>
						</CartCompleteOrderId>
						<CopyToClipboard text={coupon} onCopy={copyTimeout}>
							<CopyIconContainer>
								<CopyIcon>Copy</CopyIcon>
							</CopyIconContainer>
						</CopyToClipboard>
						{copied && <ShowCopyMessage>Copied!</ShowCopyMessage>}
					</CartCompleteOrderContainer>
				</SummaryWinner>
			)}
			{score < minimumScore && (
				<SummaryNote>
					<strong>Unfortunately,</strong>
					<span>
						you loose. <br />
						<br />
						Good luck next time!
					</span>
				</SummaryNote>
			)}
			<SummaryNote>
				Check questions and answers down below:
			</SummaryNote>
			{data.map((el, i) => (
				<Question
					key={i}
					answer={el[Object.keys(el)[0]]}
					question={questions.questions[Object.keys(el)[0]]}
				/>
			))}
		</SummaryContainer>
	);
};

export default Summary;
