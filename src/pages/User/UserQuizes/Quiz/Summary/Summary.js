import React, { useState, useEffect } from 'react';

import { useLocation, Redirect } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
	CartCompleteOrderId,
	CopyIcon,
	CopyIconContainer,
	ShowCopyMessage,
	CartCompleteOrderContainer,
} from 'pages/Cart/CartComplete/CartCompleteElements';

import {
	SummaryContainer,
	SummaryHeading,
	SummaryWinner,
	SummaryNote,
} from './SummaryElements';
import { QuizQuestion } from 'pages';

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
							{coupon === 'SAMPLE10'
								? 'BUT: You cant use this code, because this is demo quiz. Please go to admin panel, add quiz and play for real!'
								: 'Here is your coupon. REMEMBER: You can use it only once.'}
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
				<QuizQuestion
					key={i}
					answer={el[Object.keys(el)[0]]}
					question={questions.questions[Object.keys(el)[0]]}
				/>
			))}
		</SummaryContainer>
	);
};

export default Summary;
