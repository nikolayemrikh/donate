<template>
  <form class="donate" @submit="handleSubmit">
    <ul class="presets">
      <li v-for="amount in presets" :key="amount">
        <input
          :id="'a-' + amount"
          type="radio"
          name="amount"
          :value="amount"
          v-model="currentAmount"
        />
        <label :for="'a-' + amount"
          >{{ getCurrencySign(currency)
          }}{{ formatAmount(amount, currency) }}</label
        >
      </li>
    </ul>
    <div class="input-group">
      <span class="input-sign">{{ getCurrencySign(currency) }}</span>
      <label class="input-label">
        <input
          class="amount-input"
          :value="currentAmount"
          @input="handleInput"
        />
      </label>
      <select v-model="currency">
        <option v-for="currency in currenciesByCode" :key="currency.code">
          {{ currency.code }}
        </option>
      </select>
    </div>

    <div>
      <button class="submit-button" type="submit" :disabled="!currentAmount">
        donate
      </button>
    </div>
    <div class="message" v-if="donationResult">
      <span v-if="donationResult.success">Thank you for your donation!</span>
      <span v-if="!donationResult.success">{{
        donationResult.errorMessage
      }}</span>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { presets } from "@/store/presets";
import { Currency } from "@/types/currency";
import { State } from "@/types/store";
import { currenciesByCode } from "@/store/defaults";
import { ActionTypes } from "@/enums";

@Component
export default class DonateForm extends Vue {
  readonly currenciesByCode = currenciesByCode;

  formatAmount = (amount: number, currency: Currency["code"]): string => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      currency,
    }).format(amount);
  };

  getCurrencySign = (currency: Currency["code"]): string => {
    return currenciesByCode[currency].symbol;
  };

  handleInput(evt: Event): void {
    const val = (evt.target as HTMLFormElement).value.replace(/[^\d]/g, "");
    (evt.target as HTMLFormElement).value = val;
    this.$typedStore.dispatch(ActionTypes.UPDATE_CURRENT_AMOUNT, Number(val));
  }

  handleSubmit(evt: Event): void {
    evt.preventDefault();
    this.$typedStore.dispatch(ActionTypes.SUBMIT_DONATE, undefined);
  }

  get currentAmount(): string {
    return this.$typedStore.state.amount.toString();
  }

  set currentAmount(val: string) {
    this.$typedStore.dispatch(ActionTypes.UPDATE_CURRENT_AMOUNT, Number(val));
  }

  get presets(): readonly number[] {
    return presets[this.$typedStore.state.currency];
  }

  get currency(): Currency["code"] {
    return this.$typedStore.state.currency;
  }

  set currency(currency: Currency["code"]) {
    this.$typedStore.dispatch(ActionTypes.UPDATE_CURRENCY, currency);
  }

  get donationResult(): State["donationResult"] {
    return this.$typedStore.state.donationResult;
  }
}
</script>

<style scoped lang="scss">
$textColor: #ffffff;
$activeColor: #5667cb;

.donate {
  display: grid;
  width: 300px;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 1fr;
  gap: 20px;
}

.presets {
  display: grid;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(3, auto);
  gap: 10px;

  input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;

    &:checked + label {
      color: $textColor;
      background-color: darken($activeColor, 5%);
    }

    &:active + label {
      color: $textColor;
      background-color: lighten($activeColor, 5%);
    }
  }

  label {
    display: block;
    padding: 10px 5px;
    border: 1px solid #cccccc;
    border-radius: 3px;
    text-align: center;

    &:hover {
      background-color: lighten($activeColor, 10%);
      color: $textColor;
    }
  }
}

.submit-button {
  width: 100%;
  padding: 10px;
  text-transform: uppercase;
  border: 1px solid #cccccc;
  border-radius: 3px;
  color: $textColor;
  background-color: $activeColor;

  &:hover {
    background-color: lighten($activeColor, 5%);
  }

  &:active {
    background-color: darken($activeColor, 5%);
  }
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

.message {
  text-align: center;
}
</style>
