<template>
  <form class="donate">
    <ul class="presets">
      <li v-for="amount in presets" :key="amount">
        <input :id="'a-' + amount" type="radio" name="amount" :value="amount" v-model="currentAmount"> 
        <label :for="'a-' + amount">{{getCurrencySign(currency)}}{{ formatAmount(amount, currency) }}</label>
      </li>
    </ul>
    <div class="input-group">
      <span class="input-sign">{{ getCurrencySign(currency) }}</span>
      <label class="input-label">
        <input class="amount-input" :value="currentAmount" @input="handleInput" />
      </label>
      <select v-model="currency">
        <option v-for="currency in currenciesByCode" :key="currency.code">
          {{ currency.code }}
        </option>
      </select>
    </div>

    <button class="submit-button" type="submit">donate</button>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import { presets } from "@/store/presets";
import { Currency } from "@/types/currency";
import { currenciesByCode } from "@/store/defaults";
import { ActionTypes } from "@/enums";

@Component
export default class DonateForm extends Vue {
  readonly currenciesByCode = currenciesByCode;

  formatAmount = (amount: number, currency: Currency['code']): string => {
    const sign = this.getCurrencySign(currency);
    return new Intl.NumberFormat('en-US', {style: 'decimal', currency}).format(amount);
  }

  getCurrencySign = (currency: Currency['code']): string => {
    return currenciesByCode[currency].symbol;
  }

  handleInput(evt) {
    const val = evt.target.value.replace(/[^\d]/g, "");
    evt.target.value = val;
    this.$typedStore.dispatch(ActionTypes.UPDATE_CURRENT_AMOUNT, Number(val));
  }

  get currentAmount(): string {
    return this.$store.state.amount;
  }

  set currentAmount(val: string) {
    this.$typedStore.dispatch(ActionTypes.UPDATE_CURRENT_AMOUNT, Number(val));
  }
  
  get presets() {
    return presets[this.$store.state.currency];
  }

  get currency() {
    return this.$store.state.currency;
  }
  
  set currency(currency: Currency['code']) {
    this.$typedStore.dispatch(ActionTypes.UPDATE_CURRENCY, currency);
  }
}
</script>

<style scoped lang="scss">
.donate {
  display: grid;
  width: 300px;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 1fr;
  gap: 20px;
}

.presets {
  $textColor: #ffffff;
  $bgColor: #5667cb;

  display: grid;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(3, auto);
  gap: 10px;

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;

    &:checked + label,
    &:active + label {
      background-color: $bgColor;
      color: $textColor;
    }
  }

  label {
    display: block;
    padding: 10px 5px;
    border: 1px solid #cccccc;
    border-radius: 3px;
    text-align: center;

    &:hover {
      background-color: lighten($bgColor, 10%);
      color: $textColor;
    }
  }
}

.submit-button {
  text-transform: uppercase;
}

.input-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 3px;
}

.amount-input {
  border: none;
  outline: none;
  width: 100%;
}

.input-sign {
  flex: 0 1 auto;
}

.input-label {
  flex: 1 0 auto;
}
</style>
