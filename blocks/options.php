<p>With how many decks do you want to play? (1-20)</p>
<input name="number_of_decks" type="text" min="1" max="20" value="1" autocomplete="off">
<p>When should be shuffled the deck again? How big part of the deck should be burned in percent? (It can be from after all deals (0 %) to 75 %.)</p>
<input name="part_of_decks" type="text" min="0" max="75" value="65" autocomplete="off">
<p>By 17 or 18 should the dealer stand? (<=16 hit and >=17 stand or <=17 hit and >=18 stand)</p>
<select name="dealer_stands">
	<option value="17">stands on 17 or greater</option>
	<option value="18">hits on 17 but not greater</option>
</select>
</br></br>
<button id="save_and_play">Save, and start a new game!</button>