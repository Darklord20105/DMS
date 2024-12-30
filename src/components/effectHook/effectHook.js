import React, { useState, useEffect } from "react";
import { UseCaseAnimation, UseCaseLiveFilter, UseCaseDataLoader} from './index.js'

const m = [
	{name: 'ahmed', age: 25},
	{name: 'beluga',age: 56},
	{name: 'caress', age: 13},
]

export function EffectHook() {
	return(
		<div>
		  <UseCaseDataLoader />
		  <UseCaseLiveFilter />
		  <UseCaseAnimation />
		</div>
	)
};
